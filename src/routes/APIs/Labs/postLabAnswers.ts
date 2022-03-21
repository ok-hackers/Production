/*
Author: Nate Fabian
Date: 3/20/22
Purpose: Endpoint for student lab answers and submit to database
*/

interface Answer {
	correct: boolean,
	data: string
}
interface DocumentData {
	answer: Array<Answer>,
	data: Object,
	id: number,
	type: string
}
interface LabData {
	Description: string,
	DocumentData: Array<DocumentData>,
	DueDate: string,
	ID: number,
	Name: string,
	Published: boolean
}

import type {LabAnswer} from '../../../Lib/LabAnswer'
import GetUsernameFromEmail from '../../../Lib/GetUsernameFromEmail';
import Database, {DBGroups} from '../../../Lib/DatabaseConnector'

export async function post({ request }) {
	let body = await request.formData();

	let email = body.get("Email");

	let data: LabAnswer = {
		userName: GetUsernameFromEmail(email),
		labName: body.get("LabName"),
		answersArray: JSON.parse(body.get("AnswersArray")) as Array<Number>
	}

	let db = new Database(DBGroups.Labs);

	let allLabs = await db.data;
	let labData: LabData;


	let labArray = Object.keys(allLabs);

	
	labArray.forEach(lab => {
		if (lab == data.labName) {
			labData = allLabs[lab] as LabData;
		}
	});

	let questionCounter = 0;
	let totalCorrectQuestions = 0;

	labData.DocumentData.forEach((item)=>{
		if (item.type == "Question") {
			let correct = -1;
			item.answer.forEach((answer, i)=>{
				if (answer.correct) {
					correct = i;
				}
			});


			if (data.answersArray[questionCounter] as number - 1 == correct) {
				totalCorrectQuestions++;
			}

			questionCounter += 1;
		}
	});

	db.submitLabAnswer(data.labName, data.userName, totalCorrectQuestions, questionCounter, labData.ID);
	
	
	return {
		body: {
			message: "Lab Answers Saved",
			status: 200
		},
		status: 200
	}
}