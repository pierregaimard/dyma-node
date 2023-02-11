const list = document.querySelector(".tweet-list");

const deleteTweet = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/tweet/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      return await response.text();
    }

    console.log(`Status: ${response.status}. Error: ${response.statusText}}`);
  } catch (err) {
    console.log(err);
  }
};

const displayTweetList = (htmlList) => {
  list.innerHTML = htmlList;
};

list.addEventListener("click", async (event) => {
  if (!(event.target instanceof HTMLButtonElement)) {
    return;
  }

  const action = event.target.dataset.action;
  const tweetId = event.target.closest(".tweet-element").dataset.tweetId;

  if (action === "delete") {
    const tweets = await deleteTweet(tweetId);
    displayTweetList(tweets);
  }
});
