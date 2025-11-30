'use client'
import React, { useState, useEffect } from "react";
import {Listbox, ListboxItem, Avatar} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import { useSelector } from "react-redux";

const Table = ({ list, searchQuery, onUserSelect }) => {
  const [selectedUser, setSelectedUser] = React.useState(null);
  
  // Enhanced search that handles "firstName + space + lastName"
  const filteredList = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return list;
    }
    
    const query = searchQuery.toLowerCase().trim();
    const queryParts = query.split(/\s+/);
    
    return list.filter(user => {
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase().trim();
      const email = user.email?.toLowerCase() || '';
      const firstName = user.firstName?.toLowerCase() || '';
      const lastName = user.lastName?.toLowerCase() || '';
      
      if (queryParts.length > 1) {
        const matchesFullName = fullName.includes(query);
        const matchesFirstAndLast = 
          (firstName.includes(queryParts[0]) && lastName.includes(queryParts[1])) ||
          (firstName.includes(queryParts[1]) && lastName.includes(queryParts[0]));
        
        if (matchesFullName || matchesFirstAndLast) {
          return true;
        }
      }
      
      return (
        firstName.includes(query) ||
        lastName.includes(query) ||
        email.includes(query) ||
        fullName.includes(query)
      );
    });
  }, [list, searchQuery]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    if (onUserSelect) {
      onUserSelect(user);
    }
  };

  const getItemKey = (item) => {
    return item.id || item.email || `${item.firstName}-${item.lastName}` || Math.random().toString(36);
  };

  if (filteredList.length === 0) {
    return (
      <ListboxWrapper>
        <div className="max-w-xs h-[91vh] overflow-auto flex items-center justify-center bg-pink-25">
          <div className="text-center text-gray-500">
            {searchQuery.trim() ? "No users found matching your search." : "No users available."}
          </div>
        </div>
      </ListboxWrapper>
    );
  }

  return (
    <ListboxWrapper>
      <Listbox
        classNames={{
          base: "max-w-xs h-[91vh] overflow-auto bg-white",
          list: "max-h-[300px] overflow-auto",
        }}
        items={filteredList}
        label="Users"
        variant="flat"
      >
        {(item) => (
          <ListboxItem 
            key={getItemKey(item)} 
            textValue={item.name || `${item.firstName} ${item.lastName}`}
            onClick={() => handleUserClick(item)}
            className={`cursor-pointer transition-all duration-200 ${
              selectedUser?.id === item.id 
                ? 'bg-pink-100 border-l-4 border-gray-500 shadow-sm' 
                : 'hover:bg-pink-50'
            }`}
          >
            <div className="flex gap-2 items-center">
              <Avatar 
                alt={item.name || `${item.firstName} ${item.lastName}`} 
                className="flex-shrink-0 border-2 border-gray-200" 
                size="sm" 
                src={item.avatar} 
              />
              <div className="flex flex-col">
                <span className={`text-medium font-semibold ${
                  selectedUser?.id === item.id ? 'text-gray-800' : 'text-gray-900'
                }`}>
                  {item.firstName} {item.lastName} 
                </span>
                <span className="text-small text-gray-600">{item.email}</span>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
}

const Page = ({ searchQuery = '', onUserSelect }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userDetails } = useSelector(state => state.user);

  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:8000/userList');
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await res.json();
        
        const processedData = data.map((item, index) => ({
          ...item,
          id: item.id || item._id || index
        }));
        
        setList(processedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching user list:', err);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    }

    fetchList();
  }, []);

  const filteredList = React.useMemo(() => {
    return list.filter(item => item.email !== userDetails?.email);
  }, [list, userDetails?.email]);

  if (loading) {
    return (
      <ListboxWrapper>
        <div className="max-w-xs h-[91vh] overflow-auto flex items-center justify-center bg-white">
          <div className="text-center text-gray-500">Loading users...</div>
        </div>
      </ListboxWrapper>
    );
  }

  if (error) {
    return (
      <ListboxWrapper>
        <div className="max-w-xs h-[91vh] overflow-auto flex items-center justify-center bg-white">
          <div className="text-center text-gray-600">{error}</div>
        </div>
      </ListboxWrapper>
    );
  }

  return (
    <>
      <Table list={filteredList} searchQuery={searchQuery} onUserSelect={onUserSelect} />
    </>
  );
}

export default Page;