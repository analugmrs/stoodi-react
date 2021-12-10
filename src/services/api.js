export const url = 'https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/';

export const questionApi = async () => {
    const response = await fetch(url);
    return await response.json();
}

export const answerQuestion = async (exercise_id, choice) => {
    const response = await fetch(url);
    console.log(exercise_id, choice)
    return await response.json();
}

export async function httpPost (exercise_id, choice) {
    var teste;
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json;charset=utf-8");
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({exercise_id, choice}),
      redirect: 'follow'
    };
    
    await fetch("https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/", requestOptions)
      .then(response => response.json())
      .then((result) => {
        teste = result;
        }
    )
    return teste;
}
