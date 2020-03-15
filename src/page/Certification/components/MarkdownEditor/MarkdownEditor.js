import React, {useState} from 'react';
import "../../../../i18N"
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import ReactMarkdown from "react-markdown";

export default function MarkdownEditor({value, setValue}) {
    const [selectedTab, setSelectedTab] = useState("write");

    function changeTab() {
        if (selectedTab === "write") {
            setSelectedTab("preview");
        } else {
            setSelectedTab("write")
        }
    }

    return (
        <ReactMde
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={changeTab}
            generateMarkdownPreview={(markdown) =>
                Promise.resolve(<ReactMarkdown source={markdown}/>)
            }
        />
    );
}