import { toast } from "react-toastify";

export const capitalizeFirstLowercaseRest = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
function iterateDeepObj(obj) {
  if (typeof obj === "string") {
    return obj;
  }
  if (obj[Object.keys(obj)[0]]) {
    return iterateDeepObj(obj[Object.keys(obj)[0]]);
  }
  return obj;
}
export const toastAPIError = (message, status, data) => {
  switch (status) {
    case 400: {
      const errorToPrint = iterateDeepObj(data);
      if (errorToPrint) {
        toast.error(errorToPrint, {
          autoClose: 3000,
          pauseOnHover: false,
        });
      } else {
        toast.error(
          `${status} The server was unable to understand the request`,
          {
            autoClose: 3000,
            pauseOnHover: false,
          }
        );
      }
      break;
    }

    case 401: {
      toast.error(`${status} Unauthorized Request`, {
        autoClose: 3000,
        pauseOnHover: false,
      });
      break;
    }

    case 403: {
      toast.error(
        `Forbidden Request: Execution of access to this resource is forbidden.`,
        {
          autoClose: 3000,
          pauseOnHover: false,
        }
      );
      break;
    }

    case 404: {
      toast.error(`${status} Requested resoure not found`, {
        autoClose: 3000,
        pauseOnHover: false,
      });
      break;
    }

    default: {
      toast.error(message, {
        autoClose: 3000,
        pauseOnHover: false,
      });
    }
  }
};
export const timeOut = 2000;
export const intRegex = /^(null|\d+(\.\d+)?)$/;
export const emailRegX =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
