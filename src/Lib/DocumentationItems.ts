export enum LabItem {
	Question = "Question",
	Documentation = "Documentation",
}

export interface QuestionAnswer {
	data: string,
	correct: boolean
}

export interface Question {
	type: LabItem,
	id: number,
	data: any,
	answer: Array<QuestionAnswer>
}

export interface Documentation {
	type: LabItem,
	id: number,
	data: any
}