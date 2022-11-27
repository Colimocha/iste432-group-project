'use client';

import { getSocietyContacts } from '#/lib/api/societyContact';
import { getSocieties, getSociety } from '#/lib/api/society';
import { SocietyContact } from '#/lib/model/SocietyContact';
import { Society } from '#/lib/model/Society';
import { useEffect, useState } from 'react';

export default function VoterList() {
    const [societyContacts, setSocietyContacts] = useState([]);
    const [societies, setSocieties] = useState([])

    useEffect(() => {
        const token = sessionStorage.getItem('token') || '';
        getSocietyContacts(token)
            .then((res) => setSocietyContacts(res))
            .catch((err) => console.log(err));

        getSocieties(token)
            .then((res) => setSocieties(res))
            .catch((err) => console.log(err))
    }, []);

    return (
        <table className="table table-zebra w-full">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Society</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {societyContacts.map((sc: SocietyContact, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            {sc.username}
                        </td>
                        <td>
                            {
                                societies.map((society: Society) => {
                                    if (society.id == sc.id)
                                        return society.name;
                                })
                            }
                        </td>
                        <td className="space-x-2">
                            <button className="btn btn-sm btn-primary">Edit</button>
                            <button className="btn btn-sm btn-error">Remove</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
