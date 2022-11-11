
class EndoSimDB {

    constructor(){
        this.baseURL = "http://localhost:3030"
    }

    async GetAll(){
        try{
            const apiResponse = await fetch(`${this.baseURL}/api/GetAll`);
            if(apiResponse.ok){
                const responseBody = await apiResponse.json();
                return responseBody;
            }
        }catch(err){
            return null;
        }
    }

    async GetById(id){
        try{
            const apiResponse = await fetch(`${this.baseURL}/api/GetById?id=${id}`);
            if(apiResponse.ok){
                const responseBody = await apiResponse.json();
                return responseBody;
            }
        }catch(err){
            return null;
        }
    }

    async Search(model){
        try{
            const apiResponse = await fetch(`${this.baseURL}/api/search`,{
                method:"POST",
                body:model,
                mode:"no-cors"
            });
            if(apiResponse.ok){
                const responseBody = await apiResponse.json();
                return responseBody;
            }
        }catch(err){
            return null;
        }
    }

}