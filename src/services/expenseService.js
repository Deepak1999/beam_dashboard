
import { toast } from 'react-toastify'
import { common_axios } from '../App';











//Loading..
export const getCompanies1 = async () => {
    try {
        const res = await common_axios.get(
            "company/v1/details"
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
};




//save revenue  
export const saveRevenue = async (data) => {
    try {
        const res = await common_axios.post(
            "company/v1/details", data
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}



//create  api for save
export const saveBusiness = async (data) => {
    try {
        const res = await common_axios.post(
            "business/v1/save-details", data
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}



//get  cost center detals  

export const getCosstCenterDetails = async (data) => {
    try {
        const res = await common_axios.post(
            "company/v1/cost-center-details", data
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}


//get year month for create 

export const getYearMont1h = async () => {
    try {
        const res = await common_axios.get(
            "country/v1/year-month"
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}


//get currencies  

export const getCurrencyDetail1s = async () => {
    try {
        const res = await common_axios.get(
            "country/v1/currency-list"
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}


//approve reject with status  
export const ApproveReject = async (formdata) => {
    try {
        const res = await common_axios.post(
            "business/v1/change-status", formdata
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}




export const queriesByBusiness = async (formdata) => {
    try {
        const res = await common_axios.post(
            "/business/v1/query-detail-by-business", formdata
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}




//get detail  by  id  

export const getDetailsById = async (formdata) => {
    try {
        const res = await common_axios.post(
            "business/v1/details-by-id?businessDetailId=" + formdata.id, {}
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}







//Loading..
export const getDataForRequests = async (formdata) => {
    try {
        const res = await common_axios.post(
            "/business/v1/details", formdata
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}


// raise query  

export const raiseQueries = async (formdata) => {
    try {
        const res = await common_axios.post(
            "/business/v1/raise-query", formdata
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}



//Loading...
export const getDataByUploadId = async (formdata) => {
    try {
        const res = await common_axios.post(
            "/business/v1/summary-report", formdata
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}




//Loading.
export const ModifyExpenses = async (formdata) => {
    try {
        const res = await common_axios.post(
            "/business/v1/modify-details", formdata
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}



export const DownloadFile = async (formdata) => {
    try {
        const res = await common_axios.get(
            "/business/v1/download/uploaded-file/" + formdata.uploadId
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}



// Reply Query   
export const replyQueries = async (formdata) => {
    try {
        const res = await common_axios.post(
            "/business/v1/reply-query", formdata
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}

//Get query  details

export const getqueryDetails = async (formdata) => {
    try {
        const res = await common_axios.post(
            "/business/v1/query-detail-by-business", formdata
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}





export const getqueryLists = async (formdata) => {
    try {
        const res = await common_axios.post(
            "/business/v1/query-detail", formdata
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}



export const uploadFile = async (formdata) => {
    try {
        const res = await common_axios.post(
            "business/v2/upload", formdata
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}







//  get summary details ;

export const getSummaryDetails1122 = async (formdata) => {
    try {
        const res = await common_axios.post(
            "business/v1/summary-by-head", formdata
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}


export const GetSUmmaryData = async (formdata) => {
    try {
        const res = await common_axios.post(
            "/report/v1/budget-excel-data", formdata
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}






export const getClientCostCenters = async (formdata) => {
    try {
        const res = await common_axios.post(
            "/company/v1/cost-client-mapping", formdata
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
}