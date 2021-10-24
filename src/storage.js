
/*
以下の処理では、web storageに保存した過去のtodo記録を取り出し、未完了リスト、完了リストに追加する。
*/
// ストレージの定義
const storage = localStorage;

// todoを記録するリストを初期化
let comp_list_new = [];
let incomp_list_new = [];

// web storageに過去のtodo記録がない時用のテスト(初回起動時を想定)
// localStorage.removeItem('comp_list')
// localStorage.removeItem('incomp_list')

// web strageに過去のtodoの記録があれば読み込み、なければ初期化する
if (JSON.parse(storage.getItem('comp_list') === null && JSON.parse(storage.getItem('incomp_list') === null))) {
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

// 配列内の要素を削除してwebstorageに保存する関数
const deleteFromWebstrageArray = (array,text, array_name) => {
  let index_del_position = array.indexOf(text);
  array.splice(index_del_position, 1);
  console.log(array);
  storage.setItem(array_name, JSON.stringify(array));
};

// 配列内の末尾に要素を追加する関数
const pushToWebstrageArray = (array,text,array_name) => {
  array.push(text);
  console.log(array);
  storage.setItem(array_name, JSON.stringify(array));
};

// webstorageにある未完了リストをtodoリストに追加
let list_past_imcomp_todo = JSON.parse(storage.getItem('incomp_list'));
list_past_imcomp_todo.map((todo) => {
  console.log("incomp_list");
  console.log(todo);
  createIncompleteList(todo);
});
// webstorageにある完了リストをtodoリストに追加
let list_past_comp_todo = JSON.parse(storage.getItem('comp_list'));
list_past_comp_todo.map((todo) => {
  console.log("comp_list");
  console.log(todo)
  setIncompleteListFromPasttodo(todo);
});

// web storageからのデータの読み込み結果を表示
console.log("incomp_list_new");
console.log(incomp_list_new);
console.log("comp_list_new");
console.log(comp_list_new);