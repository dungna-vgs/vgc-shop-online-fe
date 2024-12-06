import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(body)
}

// const updateDataToGoogleSheet = async (data) => {
// 	try {
// 		const SHEET_ID = process.env.SHEET_ID;
// 		const serviceAccountAuth = new JWT({
// 			email: process.env.GOOGLE_CLIENT_EMAIL,
// 			key: handleKeyGooglePrivateKey(),
// 			scopes: ['https://www.googleapis.com/auth/spreadsheets']
// 		});
// 		let currentDate = new Date();
// 		let formatedDate = convertLocationTimeToGTM7Time(currentDate);
// 		const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
// 		await doc.loadInfo();
// 		const sheet = doc.sheetsByIndex[0];
// 		await sheet.addRow({
// 			...data,
// 			'Ngày tạo': formatedDate
// 		});
// 		return [true, null];
// 	} catch (e) {
// 		console.log(e);
// 		return [false, e];
// 	}
// };
// function handleKeyGooglePrivateKey() {
// 	if (process.env.GOOGLE_PRIVATE_KEY) {
// 		return process.env.GOOGLE_PRIVATE_KEY.replace(`-----BEGIN\nPRIVATE\nKEY-----`, '-----BEGIN PRIVATE KEY-----')
// 			.replace(
// 				`-----BEGIN PRIVATE
// KEY-----`,
// 				'-----BEGIN PRIVATE KEY-----'
// 			)
// 			.replace(
// 				`-----END PRIVATE KEY-----`,
// 				'-----END PRIVATE KEY-----'
// 			)
// 			.replace(`-----END\nPRIVATE\nKEY-----`, '-----END PRIVATE KEY-----');
// 	}
// }