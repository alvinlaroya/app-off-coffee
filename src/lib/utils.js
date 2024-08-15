//@ts-nocheck
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import { invalidateAll } from "$app/navigation";
import { enhance, applyAction, deserialize } from "$app/forms";
import imageCompression from 'browser-image-compression';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const flyAndScale = (
	node,
	params = { y: -8, x: 0, start: 0.95, duration: 150 }
) => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (valueA, scaleA, scaleB) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style) => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

const formData = (obj) => {
	var form_data = new FormData();
	for (var key in obj) {
		form_data.append(key, obj[key]);
	}
	return form_data;
};

export const useEventService = async (obj, action) => {
	const response = await fetch(action, {
		method: "POST",
		body: JSON.stringify(obj),
	});

	/** @type {import('@sveltejs/kit').ActionResult} */
	const result = deserialize(await response.text());

	if (result.type === "success") {
		// rerun all `load` functions, following the successful update
		await invalidateAll();
	}

	applyAction(result);

	return result;
}

export const currentlyOpen = (opening, closing) => {
	const currentTime = new Date().getHours();
	const formattedOpening = Number(opening?.split(':')[0])
	const formattedClosing = Number(closing?.split(':')[0])

	const openingTime = opening?.split(':00 ')[1] === 'PM' ? formattedOpening + 12 : formattedOpening
	const closingTime = closing?.split(':00 ')[1] === 'PM' ? formattedClosing + 12 : formattedClosing

	return openingTime <= currentTime && currentTime <= closingTime
}

export const uploadCompressImage = async (imageFile) => {
	const options = {
		maxSizeMB: 5,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	}
	try {
		const compressedFile = await imageCompression(imageFile, options);
		console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
		console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

		return compressedFile;
		/* const response = await uploadToServer(bucket, compressedFile, filename);
		console.log(response) */
	} catch (error) {
		console.log(error);
	}
}