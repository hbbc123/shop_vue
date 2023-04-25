export default function useBefSearch() {
    return JSON.parse(localStorage.getItem("Search_History"));
}
