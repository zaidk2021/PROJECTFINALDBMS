import swal from "sweetalert";
import setAuthToken from "./setAuthToken";




const errorHandler = (err:any):any => {
  if (err?.response) {

    
    console.error(err.response);

    if(err.response.status === 401) {
      localStorage.removeItem('user');
      setAuthToken(false);
      window.location.href = `/`;
    }

    if (err.response.status === 404) {

      const msg = err.response.data.msg || `404 Not Found!`;

      return   swal({
        title: 'Error',
        text: msg,
        icon: 'error'
    });

    } else if ([500, 400].includes(err?.response?.status)) {

      if (err.response.data.error) {

        return  swal({
            title: 'Error',
            text: err.response.data.error,
            icon: 'error'
        });

      }

      if (err.response.data.msg) {

        let msg = Array.isArray(err.response.data.msg)

          ? err.response.data.msg[0]

          : err.response.data.msg || "Something went wrong!"; //this part is correct

        return swal({
            title: 'Error',
            text: msg,
            icon: 'error'
        });

      }



      if (err.response?.data?.data) {
      
        
        let msg =

          typeof err.response?.data?.data === "object"

            ? `${Object.keys(err.response.data.data)[0]} :` + `${Object.values(err.response.data.data)[0]}`.replace("}"," ")

              || "Something went wrong!"

            : err.response.data.msg|| err.response.data.data  || "Something went wrong!"; 
        return swal({
            title: 'Error',
            text: Array.isArray(msg) ? msg[0] : msg,
            icon: 'error'
        });

      }
     else  if (err.response?.data) {
      
        
        let msg =

          typeof err.response?.data === "object"

            ? `${Object.keys(err.response.data)[0]} :` + `${Object.values(err.response.data)[0]}`.replace("}"," ")

              || "Something went wrong!"

            : err.response.data.msg || "Something went wrong!"; 
        return swal({
            title: 'Error',
            text: Array.isArray(msg) ? msg[0] : msg,
            icon: 'error'
        });

      }

    }

  } else {

    return swal({
        title: 'Error',
        text: err.message || "Something went wrong!",
        icon: 'error'
    });

  }

};



export default errorHandler;