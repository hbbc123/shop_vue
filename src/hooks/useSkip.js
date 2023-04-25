export default function userSkip(type,value,Hot_word,Input_Value){
    if (type == 0) {
        if (Hot_word.Search_History) {
            const new_hot_word = Hot_word.Search_History.filter(val => val != Input_Value.value)
          console.log(Input_Value.value);
          console.log(Input_Value);
            new_hot_word.unshift(Input_Value.value)
            Hot_word.Search_History = new_hot_word
        } else {
            Hot_word.Search_History.push(Input_Value.value)
        }
    } else {
        if (Hot_word.Search_History) {
            const new_hot_word = Hot_word.Search_History.filter(val => val != value)
            new_hot_word.unshift(value)
            Hot_word.Search_History = new_hot_word
        } else {
            Hot_word.Search_History.push(value)
        }
    }
    localStorage.setItem('Search_History', JSON.stringify(Hot_word.Search_History))
}