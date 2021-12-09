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

export function async httpPost (exercise_id, choice) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json;charset=utf-8");
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
    //   {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
      body: JSON.stringify({exercise_id, choice}),
      redirect: 'follow'
    };
    
    fetch("https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/", requestOptions)
      .then(response => response.text())
      .then((result) => {
        console.log('aqui a api que chama');  
        console.log(result);
          return result;
      })
      .catch(error => console.log('error', error));
}

// export const answerQuestion = async (exercise_id, choice) => {
//     const response = fetch(url, {
//         method: 'POST',
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json;charset=utf-8'
        // },
//         body: JSON.stringify({exercise_id, choice})})
//         .then((data) => {
//             console.log(data);

//             return data.json()
            
//             //     .then(response => {
//             //         console.log(response);
//             //         return response;
//             //     }
//             // )
//         })
//     }