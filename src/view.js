/*
追加ボタンが押された時の処理をする関数
*/
const onClickAdd = () => {
  // テキストボックスの値を取得
  const inputText = document.getElementById("add-text").value;
  // テキストボックスを初期化
  document.getElementById("add-text").value = "";
　// 未完了リストに追加
  createIncompleteList(inputText);
};

/*
未完了リストから指定の要素を削除する関数
*/
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

/*
未完了リストに追加する関数
*/
const createIncompleteList = (text) => {

  // webstrageに保存する未完了アレイに追加
  pushToWebstrageArray(incomp_list_new, text, "incomp_list");

  // div生成
  const div = document.createElement("div");
  div.className = "list-row";
  // liタグ生成
  const li = document.createElement("li");
  li.innerText = text;

  // button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  // 完了ボタンが押された時の処理を実行する関数
  completeButton.addEventListener("click", () => {

    // 押された完了ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompleteList(completeButton.parentNode);

    // 完了リストに追加する要素
    const addTarget = completeButton.parentNode;
    // TODO内容テキストを取得
    const text = addTarget.firstElementChild.innerText;

    // web strageに保存する未完了アレイに追加
    pushToWebstrageArray(comp_list_new, text, "comp_list");
    // web strageに保存する完了アレイから削除
    deleteFromWebstrageArray(incomp_list_new, text, "incomp_list");

    // div以下を初期化
    addTarget.textContent = null;
    // liタグ生成
    const li = document.createElement("li");
    li.innerText = text;

    // button(戻す)タグ生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    // 戻すボタンがクリックされた時の処理を実行する関数
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグ(div)を完了リストから削除
      const deleteTarget = backButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);
      // テキスト取得して未完了リストに追加
      const text = backButton.parentNode.firstElementChild.innerText;
      console.log("testtest")
      createIncompleteList(text);
      // web strageに保存する未完了アレイに追加
      // pushToWebstrageArray(incomp_list_new, text, "incomp_list");
      // web strageに保存する完了アレイから削除
      deleteFromWebstrageArray(comp_list_new, text, "comp_list");
    });

    // divタグの子要素に各要素を設定
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);

  });

  // button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  // 削除ボタンが押された時の処理を実行する関数
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode);
    // 削除する要素を取得して、未完了リストから削除
    const deleteTarget = deleteButton.parentNode;
    const text = deleteTarget.firstElementChild.innerText;
    deleteFromWebstrageArray(incomp_list_new, text, "incomp_list");
  });

  // divタグの子要素に各要素を設定
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(div);
  
};

/*
web storageの情報から完了リストに追加する処理の関数
*/
const setIncompleteListFromPasttodo = (text) => {

  // webstrageの完了リストに追加
  pushToWebstrageArray(comp_list_new, text, "comp_list");

  // 完了リストに追加する要素
  const addTarget = document.createElement("div");
  addTarget.className = "list-row";

  // liタグ生成
  const li = document.createElement("li");
  li.innerText = text;

  // button(戻す)タグ生成
  const backButton = document.createElement("button");
  backButton.innerText = "戻す";
  // 戻すボタンを押したときの処理
  backButton.addEventListener("click", () => {
    // 押された戻すボタンの親タグ(div)を完了リストから削除
    const deleteTarget = backButton.parentNode;
    document.getElementById("complete-list").removeChild(deleteTarget);
    // テキスト取得
    const text = backButton.parentNode.firstElementChild.innerText;
    createIncompleteList(text);
    // web strageに保存する未完了アレイに追加
    // pushToWebstrageArray(incomp_list_new, text, "incomp_list");
    // web strageに保存する完了アレイから削除
    deleteFromWebstrageArray(comp_list_new, text, "comp_list");
  });

  // divタグの子要素に各要素を設定
  addTarget.appendChild(li);
  addTarget.appendChild(backButton);

  // 完了リストに追加
  document.getElementById("complete-list").appendChild(addTarget);
  };

/*
追加ボタンがクリックされた時に処理を実行
*/
document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());

/*
Enterキー押下時でも追加ボタンがクリックされた時の処理を実行を押せるようにする
*/
window.document.onkeydown = function(event){
    if (event.key === 'Enter') {
      onClickAdd();
    }
}