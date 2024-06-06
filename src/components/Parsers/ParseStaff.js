async function ParseStaff(filmsId) {
  try {
    const obj = await fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${filmsId}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': '76580d12-274e-4694-a1a1-a49cc10cbbf8',
        'Content-Type': 'application/json',
      },
    });
    let json = JSON.stringify(await obj.json());
    localStorage.setItem('staff', json);
  } catch (error) {
    console.log(error);
  }
}

export default ParseStaff;