import { ItemView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot, Root } from "react-dom/client";

import { VideoContainer, VideoContainerProps } from "./VideoContainer";

export interface VideoViewProps extends VideoContainerProps {
	saveTimeOnUnload: () => void;
}

export const VIDEO_VIEW = "video-view";
export class VideoView extends ItemView {
	component: ReactDOM.Renderer;
	saveTimeOnUnload: () => void;
	root: Root;
	constructor(leaf: WorkspaceLeaf) {
		// console.log("create video view");
		super(leaf);
		this.saveTimeOnUnload = () => {};
		this.root = createRoot(this.containerEl.children[1]);
	}

	getViewType() {
		return VIDEO_VIEW;
	}

	getDisplayText() {
		return "Timestamp Video";
	}

	getIcon(): string {
		return "video";
	}

	setEphemeralState({
		url,
		setupPlayer,
		setupError,
		saveTimeOnUnload,
		start,
	}: VideoViewProps) {
		// Allows view to save the playback time in the setting state when the view is closed
		this.saveTimeOnUnload = saveTimeOnUnload;

		// Create a root element for the view to render into
		this.root.render(
			<VideoContainer
				url={url}
				start={start}
				setupPlayer={setupPlayer}
				setupError={setupError}
			/>
		);
	}

	async onClose() {
		// console.log("close video view");
		this.root.unmount();
		// if (this.saveTimeOnUnload) await this.saveTimeOnUnload();
		ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
	}
}
