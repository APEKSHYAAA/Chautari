'use client'
import React, { useState, useEffect } from "react";
import {Listbox, ListboxItem, Chip, ScrollShadow, Avatar} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";

const Table = ({ list }) => {
  const [values, setValues] = React.useState(new Set(["1"]));
  
  const arrayValues = Array.from(values);

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => {
          const user = list.find((user) => `${user.id}` === `${value}`);
          return user ? <Chip key={value}>{user.firstName}</Chip> : null;
        })}
      </ScrollShadow>
    );
  }, [arrayValues, list]);

  return (
    <ListboxWrapper>
      <Listbox
        topContent={topContent}
        classNames={{
          base: "max-w-xs h-[91vh] overflow-auto ",
          list: "max-h-[300px]",
        }}
        items={list}
        label="Assigned to"
        selectionMode="single"
        onSelectionChange={setValues}
        variant="flat"
      >
        {list.map((item, index) => (
  <ListboxItem key={item.id || index} textValue={item.name}>
            <div className="flex gap-2 items-center">
              <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
              <div className="flex flex-col">
                <span className="text-medium text-danger">{item.firstName} {item.lastName} </span>
                <span className="text-small text-black-400">{item.email}</span>
              </div>
            </div>
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  );
}

const Page = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const res = await fetch('http://localhost:8000/userList');
      const data = await res.json();
      setList(data);
    }

    fetchList();
  }, []);
console.log(list)
  return (
    <>
      {list.length > 0 && <Table list={list} />}
    </>
  );
}

export default Page;