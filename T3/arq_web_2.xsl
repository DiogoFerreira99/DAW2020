<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"></xsl:output>
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            <html>
                <head>
                    <title>Arquivo arqueológico</title>
                    <link rel="stylesheet" href="../w3.css"/>
                </head>
                <body>
                    
                    <header><div class="w3-container w3-blue w3-center">
                        <p><h1><b>Arquivo arqueológico</b></h1></p>
                    </div></header>
                    <div style="margin-left:40px"> <h3>Indice de Locais</h3></div>
                    <ul class="w3-ul w3-hoverable">
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI" lang="PT"></xsl:sort>
                        </xsl:apply-templates>
                    </ul>
                </body>
            </html>  
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <!-- Templates de indice ....................-->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"></a>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Templates conteudo ..................-->
    
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                    <link rel="stylesheet" href="../w3.css"/>
                    <link rel="stylesheet" href="../arq.css"/>
                </head>
                <body>
                    
                    <header><div class="w3-container w3-blue w3-center">
                    <h2><xsl:value-of select="IDENTI"/></h2>
                    </div></header>
                    <div class="texto">
                    <xsl:apply-templates select="INTERP"/>
                    </div>
                    <div class="w3-container w3-grey">
                        <h4><b>Informação Arqueológica</b></h4>
                    </div>
                    <div class="texto">
                    <xsl:apply-templates select="DESCRI"/>
                    <xsl:apply-templates select="CRONO"/>
                    <xsl:apply-templates select="QUADRO"/>
                    <xsl:apply-templates select="TRAARQ"/>
                    <xsl:apply-templates select="DESARQ"/>
                    <xsl:apply-templates select="DEPOSI"/>
                    <xsl:apply-templates select="INTERE"/>
                    </div>
                    <div class="w3-container w3-grey">
                        <h4><b>Localização do monumento arqueológico</b></h4>
                    </div>
                    <div class="texto">
                    <xsl:apply-templates select="CONCEL"/>
                    <xsl:apply-templates select="FREGUE"/>
                    <xsl:apply-templates select="LUGAR"/>
                    <xsl:apply-templates select="LATITU"/>
                    <xsl:apply-templates select="LONGIT"/>
                    <xsl:apply-templates select="ALTITU"/>
                    <xsl:apply-templates select="ACESSO"/>
                    </div>
                    <div class="w3-container w3-grey">
                        <h4><b>Bibliografia</b></h4>
                    </div>
                    <div class="texto">
                    <xsl:apply-templates select="BIBLIO"/>
                    </div>
                    <div class="w3-container w3-blue">
                        <xsl:apply-templates select="AUTOR"/>
                        <xsl:apply-templates select="DATA"/>
                        <div class="w3-center">
                        <address>
                            [<a href="index.html#i{generate-id()}">Voltar ao Índice</a>]
                        </address> 
                        </div>
                    </div>
                    
                    
                     
                    
                </body>
            </html>            
        </xsl:result-document>      
    </xsl:template>
    
    <xsl:template match="DESCRI"> 
        <p><b>Descrição: </b><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="CRONO"> 
        <p><b>Cronologia: </b><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="LUGAR">
        <p><b>Lugar: </b><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="FREGUE">
        <p><b>Freguesia: </b><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="CONCEL">
        <p><b>Concelho: </b><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="LATITU">
        <p><b>Latitude: </b><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="LONGIT">
        <p><b>Longitude: </b><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="ALTITU">
        <p><b>Altitude: </b><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="ACESSO">
        <p><b>Acesso: </b><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="BIBLIO">
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="DATA">
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="AUTOR">
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="QUADRO">
        <h5><b>Enquadramento:</b></h5>
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="TRAARQ">
        <h5><b>Trabalhos Arqueológicos:</b></h5>
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="DESARQ">
        <h5><b>Descobertas Arqueológicas:</b></h5>
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="INTERE">
        <h5><b>Outras informações:</b></h5>
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="DEPOSI">
        <h5><b>Depósito Arqueológico:</b></h5>
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    
</xsl:stylesheet>