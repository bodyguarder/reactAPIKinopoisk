async function ParseFilms() {
  const data = [];
  const parser = async (data, page) => {
    const params = new URLSearchParams({
      type: 'TOP_250_MOVIES',
      page: page
    }).toString();
    try {
      const obj = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?${params}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': '76580d12-274e-4694-a1a1-a49cc10cbbf8',
          'Content-Type': 'application/json',
        },
      });
      let res = (await obj.json()).items;
      data.push(...res)
    } catch (error) {
      console.log(error);
    }
  }

  for (let i = 1; i <= 13; i++) {
    await parser(data, i);
  }

  console.log(data);
  let json = JSON.stringify(data);
  localStorage.setItem('movies', json);
}

export default ParseFilms;