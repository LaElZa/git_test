(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("workComponents");
            this.set_titletext("Components Information");
            if (Form == this.constructor)
            {
                this._setFormPosition(800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsComponents", this);
            obj._setContents("<ColumnInfo><Column id=\"prefix\" type=\"STRING\" size=\"256\"/><Column id=\"form_id\" type=\"STRING\" size=\"256\"/><Column id=\"form_title\" type=\"STRING\" size=\"256\"/><Column id=\"comp_id\" type=\"STRING\" size=\"256\"/><Column id=\"comp_event\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("btnSearch",null,"10","75","25","220",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("Search");
            obj.set_cssclass("btn_WF_search01");
            this.addChild(obj.name, obj);

            obj = new Button("btnExportCSV",null,"10","95","25","120",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("Export CSV");
            obj.set_cssclass("btn_WF_save01");
            this.addChild(obj.name, obj);

            obj = new Button("btnExportExcel",null,"10","105","25","10",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("Export Excel");
            obj.set_cssclass("btn_WF_excel01");
            this.addChild(obj.name, obj);

            obj = new Grid("grdComponents","10","btnSearch:10",null,null,"10","10",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_binddataset("dsComponents");
            obj.set_treeusecheckbox("false");
            obj.set_cellsizingtype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"120\"/><Column size=\"150\"/><Column size=\"200\"/><Column size=\"200\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"prefix\"/><Cell col=\"1\" text=\"form_id\"/><Cell col=\"2\" text=\"form_title\"/><Cell col=\"3\" text=\"comp_id\"/><Cell col=\"4\" text=\"comp_event\"/></Band><Band id=\"body\"><Cell text=\"bind:prefix\" suppress=\"1\"/><Cell col=\"1\" text=\"bind:form_id\" suppress=\"2\"/><Cell col=\"2\" text=\"bind:form_title\" suppress=\"3\"/><Cell col=\"3\" text=\"bind:comp_id\" suppress=\"4\"/><Cell col=\"4\" text=\"bind:comp_event\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("stTitle","10","5",null,"35","btnSearch:10",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("Components Information");
            obj.set_cssclass("sta_WF_title01");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",800,600,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.addIncludeScript("workComponents.xfdl","Lib::libComm.xjs");
        this.registerScript("workComponents.xfdl", function() {
        this.executeIncludeScript("Lib::libComm.xjs"); /*include "Lib::libComm.xjs"*/;

        /*******************************************************************************************************************************
        	 nexacrostudio.request

        	 syntax 		: nexacrostudio.request( requestType, dataobjectID = null);
        	 description	: request the project information being developed in nexacrostudio
        					  and receive it as the data property value of Dataobject.
        	 return 		: Information requested according to requestType is returned in the form of Json format string.
        	 ___________________________________________________________________________________________________________________________
        	 requestType	:
        		1) requesttype.all									11) requesttype.services
        		2) requesttype.general								12) requesttype.protocoladaptors
        		3) requesttype.environment							13) requesttype.deviceadaptors
        		4) requesttype.screeninfo							14) requesttype.applicationvariables
        		5) requesttype.env_variables						15) requesttype.app_datasets
        		6) requesttype.env_cookies							16) requesttype.app_variables
        		7) requesttype.env_httpheader						17) requesttype.app_dataobjects
        		8) requesttype.typedefinition						19) requesttype.applications
        		9) requesttype.modules								20) requesttype.forms
        		10) requesttype.objects

        	 dataobjectID : Set the ID of the DataObject to which the requested information will be reflected according to requestType.

        ********************************************************************************************************************************/
        this.btnSearch_onclick = function(obj,e)
        {
        	// request forms information of nexacrostudio project
        	var sRtn = nexacrostudio.request(requesttype.forms);
        	var objJSON = JSON.parse(sRtn);

        	this.fnMakeComponentsData(objJSON);
        };

        this.fnMakeComponentsData = function(objJSON)
        {
        	var arrForms = objJSON.forms;
        	var objForm;

        	var arrComps;
        	var objComp;

        	var arrEvents;
        	var objEvent;

        	var nRow;
        	var sPrefixUrl;
        	var sPrefixId;
        	var sFormId;
        	var sFormTitle;
        	var sCompId;
        	var sCompClass;
        	var sCompEvent;
        	var sCompEventHandler;

        	var arrCompId;

        	this.dsComponents.clearData();
        	this.dsComponents.set_enableevent(false);

        	for (var i = 0; i < arrForms.length; i++)
        	{
        		objForm = arrForms[i];
        		sFormId = objForm.id;
        		sFormTitle = this.gfnFindValue(objForm.properties, "name", "titletext", "value");
        		sPrefixUrl = objForm.prefixurl;
        		sPrefixId = sPrefixUrl.split("::")[0];

        		nRow = this.dsComponents.addRow();
        		this.dsComponents.setColumn(nRow, "prefix", sPrefixId);
        		this.dsComponents.setColumn(nRow, "form_id", sFormId);
        		this.dsComponents.setColumn(nRow, "form_title", sFormTitle);

        		arrComps = objForm.components;

        		for (var j = 0; j < arrComps.length; j++)
        		{
        			objComp = arrComps[j];

        			arrCompId = objComp.id.split(".");
        			sCompId = arrCompId[arrCompId.length-1];
        			sCompClass = objComp.classname;

        			nRow = this.dsComponents.addRow();
        			this.dsComponents.setColumn(nRow, "prefix", sPrefixId);
        			this.dsComponents.setColumn(nRow, "form_id", sFormId);
        			this.dsComponents.setColumn(nRow, "form_title", sFormTitle);
        			this.dsComponents.setColumn(nRow, "comp_id", sCompId+"("+sCompClass+")");

        			arrEvents = objComp.events;

        			for (var k = 0; k < arrEvents.length; k++)
        			{
        				objEvent = arrEvents[k];

        				sCompEvent = objEvent.name;
        				sCompEventHandler = objEvent.handler;

        				if (k != 0) nRow = this.dsComponents.addRow();
        				this.dsComponents.setColumn(nRow, "prefix", sPrefixId);
        				this.dsComponents.setColumn(nRow, "form_id", sFormId);
        				this.dsComponents.setColumn(nRow, "form_title", sFormTitle);
        				this.dsComponents.setColumn(nRow, "comp_id", sCompId+"("+sCompClass+")");
        				this.dsComponents.setColumn(nRow, "comp_event", sCompEventHandler+"("+sCompEvent+")");
        			}
        		}
        	}

        	this.dsComponents.set_enableevent(true);

        	if (this.dsComponents.getRowCount() > 0)
        	{
        		this.grdComponents.selectRow(0);
        	}
        }

        this.fnFindValue = function(arrData, sTargetId, sTargetValue, sRtnId)
        {
        	for (var i = 0; i < arrData.length; i++)
        	{
        		if (arrData[i][sTargetId] == sTargetValue)
        		{
        			return arrData[i][sRtnId];
        		}
        	}
        	return "";
        }

        this.btnExportCSV_onclick = function(obj,e)
        {
        	this.gfnExportCSV("ComponentsInformation.csv", this.grdComponents);
        };

        this.btnExportExcel_onclick = function(obj,e)
        {
        	this.gfnExportExcel("ComponentsInformation", this.grdComponents);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.btnSearch.addEventHandler("onclick",this.btnSearch_onclick,this);
            this.btnExportCSV.addEventHandler("onclick",this.btnExportCSV_onclick,this);
            this.btnExportExcel.addEventHandler("onclick",this.btnExportExcel_onclick,this);
        };
        this.loadIncludeScript("workComponents.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
