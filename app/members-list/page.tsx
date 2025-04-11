'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; 
import Header from '@/components/header'; 
import { useRouter } from 'next/navigation';

const MembersListPage = () => {
  interface Member {
    member_id: any;
    first_name: any;
    last_name: any;
    group_id: any;
    group_name?: string;
  }

  const [members, setMembers] = useState<Member[]>([]); 
  const [error, setError] = useState<string>('');
  const router = useRouter();
  
  useEffect(() => {
    
    const fetchMembers = async () => {
      const { data: membersData, error: membersError } = await supabase
        .from('members')
        .select('member_id, first_name, last_name, group_id'); 

      if (membersError) {
        setError('Error fetching members: ' + membersError.message);
        return;
      }

      
      const memberWithGroups = await Promise.all(
        membersData.map(async (member) => {
          const typedMember = member as Member; 
          const { data: groupData, error: groupError } = await supabase
            .from('groups')
            .select('group_name')
            .eq('group_id', typedMember.group_id)
            .single(); 

          if (groupError) {
            typedMember.group_name = 'N/A'; 
          } else {
            typedMember.group_name = groupData ? groupData.group_name : 'N/A';
          }

          return typedMember;
        })
      );

      setMembers(memberWithGroups);
    };

    fetchMembers();
  }, []);

  return (
    <>
      <Header />
      <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold text-gray-700">Members List</h1>
            <button 
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                onClick={() => router.push('/')}
            >
                Go Home
            </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-lg text-gray-700">Full Name</th>
              <th className="px-6 py-3 text-left text-lg text-gray-700">Group</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.member_id} className="border-b">
                <td className="px-6 py-4 text-gray-700">{member.first_name} {member.last_name}</td>
                <td className="px-6 py-4 text-gray-700">{member.group_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MembersListPage;
