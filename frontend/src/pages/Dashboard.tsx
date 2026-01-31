import {useEffect, useState} from 'react';
import { fetchJobs } from '../api/jobs';
import type { Job } from '../types/Job';

export default function Dashboard(){

    const [jobs, setJobs]= useState<Job[]>([]);
    const [status, setStatus]= useState<string>("");

    useEffect(()=>{
        fetchJobs(status || undefined).then(setJobs);
    },[status]);


    return(
        <div>
            <h1>My applications</h1>
            
                <select
                 value={status}
                 onChange={(e)=> setStatus(e.target.value)}
                 >
                <option value="">ALL</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                 </select>

                 {jobs.map(job=>(
                    <div key={job.id}>
                        {job.company} - {job.role} ({job.status})
                    </div>
                 ))}


 
            

        </div>
    )


}