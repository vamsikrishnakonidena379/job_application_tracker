import type {Job} from '../types/Job';

const API_URL= "http://localhost:5000/api/jobs/getbystatus";

export const fetchJobs = async(): Promise<Job[]> =>{

    const url = status ? `${API_URL}?status=${status}`:API_URL;
    const res = await fetch(url, {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },


    });

    if(!res.ok)
    {
        throw new Error('Failed to fetch jobs');
    }
 
    return res.json();

};

