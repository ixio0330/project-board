/*
등록
<Request>
URL: /api/board-create
Method: POST
Body: {
	title: string,
	content: string
}

<Response>
Body: {
	isSuccess: boolean,
	message: string,
	data: []
}
*/
/*
전체 조희
<Request>
URL: /api/board
Method: GET
Body: {}

<Response>
Body: {
	isSuccess: boolean,
	message: string,
	data: [
		{
			id: number, 
			title: string, 
			content: string, 
			updated_on: string, 
			wirter: string,
		}, 
		{}...
	]
}
*/
/*
내 글 목록 전체 조회
<Request>
URL: /api/board
Method: GET
Body: {}

<Response>
Body: {
	isSuccess: boolean,
	message: string,
	data: [
		{
			id: number, 
			title: string, 
			content: string, 
			updated_on: string, 
			wirter: string,
		}, 
		{}...
	]
}
*/

/*
삭제
<Request>
URL: /api/board-delete
Method: GET
Body: {
	data: [ content-title: string ]
}

<Response>
Body: {
	isSuccess: boolean,
	message: string,
	data: []
}
*/
