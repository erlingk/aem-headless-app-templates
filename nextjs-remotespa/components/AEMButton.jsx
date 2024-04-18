/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

import React from 'react'
import { EditableComponent } from '@adobe/aem-react-editable-components'

const { NEXT_PUBLIC_AEM_SITE } = process.env;

export const ButtonConfig = {
    emptyLabel: 'Button',
    isEmpty: function(props) {
        return props.text == null || props.text.trim().length === 0;
    },
    resourceType: `${NEXT_PUBLIC_AEM_SITE}/components/button`
};

export const Button = (props) => {
    return (
        <a href={props.buttonLink.url}
           className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-full"
        >
            {props.text}
        </a>
    )
};

export const AEMButton = (props) => <EditableComponent config={ButtonConfig} {...props}><Button/></EditableComponent>;
