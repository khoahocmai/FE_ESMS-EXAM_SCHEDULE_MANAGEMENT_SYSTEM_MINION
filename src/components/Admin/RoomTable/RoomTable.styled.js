import Theme from "@/Theme";
import { Button, Space, Table, Tag } from "antd";
import styled from "styled-components";

export const DivTable = styled.div`
    margin-top: 20px;
    padding-top: 50px;
    position: relative;
`;

export const ButtonTable = styled(Button)`
    position: absolute;
    top: 0;
    right: 0;
`;

export const SpaceStyled = styled(Space)`
    position: absolute;
    top: 0;
    left: 0;

    width: 400px;

    .ant-space-item {
        width: 100%;
    }
`;

export const TagStyled = styled(Tag)`
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const StyledTable = styled(Table)`
    margin-top: 30px;

    .ant-table-cell {
        height: 65px;
        font-family: ${Theme.font.primary_font};
        font-size: 1.5rem;
    }

    .ant-typography {
        font-family: ${Theme.font.primary_font};
        font-size: 1.4rem;
    }

    .ant-tag {
        font-family: ${Theme.font.primary_font};
    }
`;
