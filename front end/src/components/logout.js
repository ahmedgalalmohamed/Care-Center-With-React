import axios from "axios";
function Logout(props) {
    axios.get("http://localhost:4000/logout", { withCredentials: true })
        .then(res => {
            window.location.assign('/');
        }).catch(err => console.log(err));
        return(null)
}
export default Logout;