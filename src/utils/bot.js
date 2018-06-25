export function botRequset(command) {
  return fetch('http://194.58.122.82/bot',{
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({command: command})
  }).then((resp)=>{
    return resp.json();
  }).then((data) =>{
    console.log(data)
    let message;
    return message = data.message
  })
}
