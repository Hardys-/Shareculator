<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" />
<xsl:template match="/">

<html>
<head>
	<title>Information</title>
	<style>
	body{
		background-image: url("../pic/bg.png");
		background-repeat: repeat;
		height:800px;
	}
	.no-display{display:none}

	</style>
</head>
<body>
	<br/><br/><br/><br/>
<xsl:for-each select="info/record">
<strong  style="margin-left:20px;background-color:#686868;padding:3px 6px; border:0px; border-radius:2px;color:#ffffff; font-family:Calibri; ">Group: <xsl:value-of select="group"/></strong>
<strong class="no-display" style="margin-left:20px;background-color:#f39951;padding:3px 6px; border:0px; border-radius:2px;color:#ffffff; font-family:Calibri;">Owner: <xsl:value-of select="owner"/></strong>
<div class="no-display" style="list-style-type: none;margin-left:25px; margin-top:10px; font-family:Calibri; ">File: <div style="color:#646464"><xsl:value-of select="file"/></div></div>
  <div  class="no-display" style="list-style-type: none;margin-left:25px; margin-top:10px; font-family:Calibri;">IP:  <div style="color:#646464"><xsl:value-of select="ip"/></div></div>
  <div style="list-style-type: none;margin-left:25px; margin-top:10px; font-family:Calibri;display:flex">TimeStamp: <div style="color:#646464"><xsl:value-of select="timeStamp"/></div></div>
  <div style="list-style-type: none;margin-left:25px; font-family:Calibri;display:flex">Count: <div style="color:#646464"><xsl:value-of select="count"/></div></div>
  <br/><br/>

</xsl:for-each>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
