export interface IFrontboxConfig {
	name: string
	files: string | string[]
	dest: string
	watch: string | string[]
	concatWith?: string
	otherTasksImpact?: boolean
}

export interface IFrontboxTask {
	destinationPath?: string
	canConcatFiles?: boolean
}
