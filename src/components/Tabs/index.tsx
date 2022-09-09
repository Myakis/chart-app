import React, { FC, useState } from "react";
import "./style.scss";
import cn from "classnames";
interface IProps {
  header: string[];
  body: any[];
}

const Tabs: FC<IProps> = ({ header, body }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const onChangeSelectTab = (index: number) => {
    if (selectedTab !== index) setSelectedTab(index);
  };

  return (
    <div className="tabs">
      <div className="tabs-container">
        <ul className="tabs__list">
          {header.map((title, index) => {
            return (
              <li
                className={cn({ "tabs__item--active": selectedTab === index }, "tabs__item")}
                onClick={() => onChangeSelectTab(index)}
              >
                {title}
              </li>
            );
          })}
        </ul>
        {body.map((item, index) => {
          if (index !== selectedTab) return null;
          return <div>{item}</div>;
        })}
      </div>
    </div>
  );
};

export default Tabs;
