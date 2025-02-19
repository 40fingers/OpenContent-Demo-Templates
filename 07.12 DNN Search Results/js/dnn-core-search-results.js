/*!
 * 40FINGERS - JavaScript Code
 * 
 * Copyright (c) 2025 40FINGERS https://www.40fingers.net
 * Author: Timo Breumelhof
 * 
 * Licensed under the MIT License (MIT):
 * https://opensource.org/licenses/MIT
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


var CustomDnnSearch = {
    portalAlias: "",
    apiCall: "/API/internalservices/searchService/search?search={0}&pageIndex={1}&pageSize={2}&sortOption={3}&culture={4}",
    debugMode: false,
    resultElementId: "oc-results",
    resultTemplate: "<h4>Search results:</h4><h5>hits: {{totalHits}}</h5>{{#each results}}<div class='item'><a href='{{DocumentUrl}}'>{{Title}}</a></div>{{/each}}",
    jsonElementId: "oc-json",
    noResultsHtml: "<h4>No results found</h4>",
    template: "Search results: {{0}}",

    getDnnSearchResults: function(searchQuery, pageIndex = 1, pageSize = 10, sortOption = 0, culture = "en-US") {
        var self = this;
        
        let url = this.portalAlias + this.apiCall
            .replace("{0}", encodeURIComponent(searchQuery))
            .replace("{1}", pageIndex)
            .replace("{2}", pageSize)
            .replace("{3}", sortOption)
            .replace("{4}", culture);

        console.log("Fetching data from:", url);
        this.getData(url);
    },

    getData: async function(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();

            if (this.debugMode){
                this.showJson(json);
            }
            this.renderSearchResults(json);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    },


    clearDnnSearchResults: function(){
        const searchResults = document.getElementById(this.resultElementId);
        if (searchResults) {
            searchResults.innerHTML = this.noResultsHtml;
        } else {
            console.warn("No results container found.");
        }
    },



    renderSearchResults: function(json) {
        const searchResults = document.getElementById(this.resultElementId);
        if (!searchResults) {
            console.warn("Search results container not found.");
            return;
        }
    
        // Always get the latest version of the template
        var updatedTemplate = this.resultTemplate;

        console.log("HBS template:", this.resultTemplate);

        var hbTemplate = Handlebars.compile(updatedTemplate);
        
        var result = hbTemplate(json);
        searchResults.innerHTML = result;
    },
    

    logString: function (message){
        if (this.debugMode){
            console.log(message);
        }
    },

    showJson: function(json){
        var str = JSON.stringify(json, null, 2); // Fixed JSON stringify
        var jsonTarget = document.getElementById(this.jsonElementId); // Fixed missing argument
        if (jsonTarget) {
            jsonTarget.innerText = str;
        } else {
            console.warn("JSON target element not found.");
        }
    },

};
