function usePost(url: string) {
  const PostData = async () => {
    try {
      const response = await fetch(url, { method: "POST" });
      if (response.ok) {
        const result = await response.json();
      }
    } catch (err) {
      console.log(err);
    }
  };
}
