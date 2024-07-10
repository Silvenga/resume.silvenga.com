import { fromMarkdown } from "mdast-util-from-markdown";
import { ReactElement } from "react";
import React from "react";
import type { Literal, Node, Parent } from "unist";
import { Text, View } from "@react-pdf/renderer";
import { tw } from "../resume/styles";

export function markdownToPdfDom(md: string) {
    const mdAst = fromMarkdown(md);
    const tree = walkAst(mdAst, "root");
    // console.log(mdAst, tree);
    return tree;
}

function walkAst(mdAst: Node, prefix: string): ReactElement {
    // Literal
    if (isLiteral(mdAst)) {
        return (
            <Text>
                {mdAst.value as string}
            </Text>
        );
    }
    // Parent
    if (isParent(mdAst)) {
        return walkParent(mdAst, prefix);
    }
    // Unknown
    throw new Error("Found a node that is neither a literal nor parent. This shouldn't be possible.");
}

function walkParent(mdAst: Parent, prefix: string) {
    const childTrees = [];
    for (let i = 0; i < mdAst.children.length; i++) {
        const childId = `${prefix}:${i}`;
        const child = mdAst.children[i];
        const childTree = walkAst(child, childId);
        childTrees.push(<React.Fragment key={childId}>{childTree}</React.Fragment>);
    }
    const children = (<>{childTrees}</>);
    const container = getContainerNode(mdAst, children);
    return container;
}

function getContainerNode(mdAst: Node, children?: ReactElement): ReactElement {
    switch (mdAst.type) {
        case "root":
            return (
                <View>{children}</View>
            );
        case "paragraph":
            return (
                <View style={tw("mb-2")}>{children}</View>
            );
        case "list":
            return (
                <View style={tw("flex flex-col my-2")}>{children}</View>
            );
        case "listItem":
            return (
                <View style={tw("flex flex-row")}>
                    <Text style={tw("px-2")}>•</Text>{children}
                </View>
            );
        default:
            throw new Error(`Unexpected token '${mdAst.type}' was discovered.`);
    }
}

function isParent(mdAst: Node): mdAst is Parent {
    return "children" in mdAst;
}

function isLiteral(mdAst: Node): mdAst is Literal {
    return "value" in mdAst;
}
