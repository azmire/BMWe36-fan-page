function usePost(url: string) {
  const PostData = async () => {
    const requestOptions = {
      method: "POST",
      //body: formdata,
      redirect: "follow" as RequestRedirect,
    };

    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const result = await response.json();
      }
    } catch (err) {
      console.log(err);
    }
  };
}
