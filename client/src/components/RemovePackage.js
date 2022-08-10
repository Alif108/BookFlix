import axios from "axios";

export default function RemovePackage() {

    const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

	axios.delete('http://localhost:5000/packages/remove/'+ id, {
        headers: {
            'token': localStorage.getItem('token'),
        }
    })
    .then(response => { 
        if(response.data.success)
            window.alert("Package Removed");
        else
            window.alert("Package could not be removed");
        window.location = "/packages/";
    });
}