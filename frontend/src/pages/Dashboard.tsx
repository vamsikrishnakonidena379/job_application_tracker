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
            {
                jobs.map(job =>(
                    <div key={job.id}>
                        {job.company}-{job.role} ({job.status})
                        </div>
                ))

            }


        </div>
    )


}