const onClickAdd = () => {

  // テキストボックスの値を取得
  const inputText = document.getElementById("add-text").value;
  // テキストボックスを初期化
  document.getElementById("add-text").value = "";
　// 未完了リストに追加
  createIncompleteList(inputText);

};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {

  // webstrageの未完了リストに追加
  console.log("here it is")
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
    // 戻すボタンがクリックされた時の処理
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
      console.log("comp_list_new2")
      console.log(comp_list_new)
      console.log("incomp_list_new2")
      console.log(incomp_list_new)
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

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());


// Enterキー押下時でも追加ボタンを押せるようにする
window.document.onkeydown = function(event){
    if (event.key === 'Enter') {
      onClickAdd();
    }
}


// 20211022試作

// todoを記録するリストを初期化
let comp_list_new = [];
let incomp_list_new = [];

// 完了データに追加する処理を関数化
const setIncompleteListFromPasttodo = (text) => {

    // webstrageの完了リストに追加
    pushToWebstrageArray(comp_list_new, text, "comp_list");

    // 完了リストに追加する要素
    const addTarget = document.createElement("div");
    addTarget.className = "list-row";
    // TODO内容テキストを取得
    // const text = text
    // div以下を初期化
    // addTarget.textContent = null;

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
      console.log("comp_list_new3")
      console.log(comp_list_new)
      console.log("incomp_list_new3")
      console.log(incomp_list_new)
    });

    // divタグの子要素に各要素を設定
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
    };


// webstorageに保存したtodo記録を取り出し、未完了リスト、完了リストに追加する。
// ストレージの定義
const storage = localStorage;

// webstrageに保存するサンプルを作成
// let comp_list = ["会社に行く", "家に帰る"];
// console.log(comp_list);
// let incomp_list = ["ご飯を食べる","散歩に行く"];
// console.log(incomp_list);
// 配列内の要素の削除の練習
  // 特定の要素の位置を取得する
  // let test_string_delete = "家に帰る"
  // console.log(comp_list.indexOf(test_string_delete));
  // let index_comp_list = comp_list.indexOf(test_string_delete);
  // comp_list.splice(index_comp_list, 1);
  // console.log(comp_list);

// 配列内の要素を削除してwebstorageに保存する関数
const deleteFromWebstrageArray = (array,text, array_name) => {
  let index_del_position = array.indexOf(text);
  array.splice(index_del_position, 1);
  console.log(array);
  storage.setItem(array_name, JSON.stringify(array));
};
// 関数のテスト
// deleteFromWebstrageArray(comp_list, "家に帰る", "comp_list");
// deleteFromWebstrageArray(incomp_list, "ご飯を食べる", "incomp_list");

// 配列に要素を追加する
// let test_string_add = "朝起きる"
// comp_list.push(test_string_add);
// console.log(comp_list);

// 配列内の末尾に要素を追加する関数
const pushToWebstrageArray = (array,text,array_name) => {
  array.push(text);
  console.log(array);
  storage.setItem(array_name, JSON.stringify(array));
};
// 関数のテスト
// pushToWebstrageArray(comp_list, "朝起き", "comp_list");
// pushToWebstrageArray(incomp_list, "ご飯を食べる", "incomp_list");

// webstrageに保存
// storage.setItem('comp_list', JSON.stringify(comp_list));
// storage.setItem('incomp_list', JSON.stringify(incomp_list));

// 過去のtodoの記録があれば読み込み、なければ初期化する
// if (JSON.parse(storage.getItem('not_defined_for_test') === null)) {
if (JSON.parse(storage.getItem('comp_list') === null)) {
  console.log("init webstorage data");
  let comp_list = [];
  storage.setItem('comp_list', JSON.stringify(comp_list));
  let incomp_list = [];
  storage.setItem('incomp_list', JSON.stringify(incomp_list));
} else {
  console.log("load webstorage data");
  console.log(JSON.parse(storage.getItem('comp_list')));
  console.log(JSON.parse(storage.getItem('incomp_list')));
}

// webstrageから呼び出してみる
// console.log(JSON.parse(storage.getItem('comp_list')));
// console.log(JSON.parse(storage.getItem('incomp_list')));

// webstorageにある未完了リストを表示
let list_past_imcomp_todo = JSON.parse(storage.getItem('incomp_list'));
list_past_imcomp_todo.map((todo) => {
  console.log("incomp_list");
  console.log(todo);
  createIncompleteList(todo);
});
// webstorageにある完了リストを表示
let list_past_comp_todo = JSON.parse(storage.getItem('comp_list'));
list_past_comp_todo.map((todo) => {
  console.log("comp_list");
  console.log(todo)
  setIncompleteListFromPasttodo(todo);
});

console.log("incomp_list_new");
console.log(incomp_list_new);
console.log("comp_list_new");
console.log(comp_list_new);
// web storageのメモ
  // ローカルストレージの指定されたキー名のデータを消去。
  // localStorage.removeItem(キー名)
  // ローカルストレージの全データを消去。
  // localStorage.clear()
