import type {Job} from '../types/Job';

const API_URL= "http://localhost:3000/api/jobs";

export const fetchJobs = async(): Promise<Job[]> =>{
    const res = await fetch(API_URL, {
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

