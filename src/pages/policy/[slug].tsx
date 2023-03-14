import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import PrivacyPolicyJson from "../../constants/privacy_policy.json";
import TermsConditionsJson from "../../constants/terms_conditions.json";
import css from "../../styles/pages/policy.module.css";
import { PolicyInformation } from "../../types";

export default function Policy() {
    
    const [{ title, sections}, setJson] = useState<PolicyInformation>({
        title: "",
        sections: []
    });
    const { query } = useRouter();
    
    useEffect(() => {
        if (!query.slug) return;
        if (query.slug.includes("privacy")) setJson(PrivacyPolicyJson)
        if (query.slug.includes("term") || query.slug.includes("condition")) setJson(TermsConditionsJson);
    }, [query.slug]);
    
    return (
        <PageWrapper useWeb3={false}>
            <div className={css.container}>
                <h2>{title}</h2>
                <div>
                    {sections.map((section: string, index: number) => {
                        const isHeader: boolean = section.split(" ").length < 5;
                        return (
                            <div key={index}>
                                {isHeader ? <h3 key={index}>{section}</h3> : <p key={index}>{section}</p>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </PageWrapper>
    );
}