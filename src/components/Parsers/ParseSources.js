async function ParseSources(filmsId) {
  const parser = async () => {
    try {
      const obj = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmsId}/external_sources?page=1`, {
        method: 'GET',
        headers: {
          'X-API-KEY': '76580d12-274e-4694-a1a1-a49cc10cbbf8',
          'Content-Type': 'application/json',
        },
      });
      let json = JSON.stringify((await obj.json()).items);
      localStorage.setItem('external_source', json);
    } catch (error) {
      console.log(error);
    }
  }
  parser();
}

export default ParseSources;