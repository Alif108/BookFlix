import axios from "axios";

export default function RemoveMyList() {

    const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

	axios.delete('http://localhost:5000/books/removeMyList/'+ id, {
        headers: {
            'token': localStorage.getItem('token'),
        }
    })
    .then(response => { 
        window.alert(response.data.message);
        window.location = "/books/user/getMyList";
    });
}