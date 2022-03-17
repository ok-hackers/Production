import type {LabAnswer} from '../../../Lib/LabAnswer'

export async function post({ request }) {
	let body = await request.formData();
	let data: LabAnswer = {
		userName: body.get("UserName"),
		labName: body.get("LabName"),
		answersArray: JSON.parse(body.get("AnswersArray"))
	}

	console.log(data);
	
	return {
		body: {
			message: "Lab Answers Saved"
		},
		status: 200
	}
}