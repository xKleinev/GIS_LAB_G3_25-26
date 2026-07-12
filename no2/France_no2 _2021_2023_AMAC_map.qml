<!DOCTYPE qgis PUBLIC 'http://mrcc.com/qgis.dtd' 'SYSTEM'>
<qgis styleCategories="Symbology|Symbology3D|Labeling|Fields|Forms|Actions|Diagrams|GeometryOptions|Relations|Legend" version="3.40.15-Bratislava">
  <pipe-data-defined-properties>
    <Option type="Map">
      <Option type="QString" name="name" value=""/>
      <Option name="properties"/>
      <Option type="QString" name="type" value="collection"/>
    </Option>
  </pipe-data-defined-properties>
  <pipe>
    <provider>
      <resampling zoomedOutResamplingMethod="nearestNeighbour" enabled="false" maxOversampling="2" zoomedInResamplingMethod="nearestNeighbour"/>
    </provider>
    <rasterrenderer classificationMin="-4.6750665" opacity="1" type="singlebandpseudocolor" alphaBand="-1" classificationMax="3.1562855" band="1" nodataColor="">
      <rasterTransparency/>
      <minMaxOrigin>
        <limits>MinMax</limits>
        <extent>WholeRaster</extent>
        <statAccuracy>Estimated</statAccuracy>
        <cumulativeCutLower>0.02</cumulativeCutLower>
        <cumulativeCutUpper>0.98</cumulativeCutUpper>
        <stdDevFactor>2</stdDevFactor>
      </minMaxOrigin>
      <rastershader>
        <colorrampshader labelPrecision="1" colorRampType="DISCRETE" classificationMode="2" maximumValue="3.1562855000000001" clip="0" minimumValue="-4.6750664999999998">
          <colorramp type="gradient" name="[source]">
            <Option type="Map">
              <Option type="QString" name="color1" value="37,152,214,255,hsv:0.55788888888888888,0.82600137331197065,0.83810177767605099,1"/>
              <Option type="QString" name="color2" value="215,25,28,255,rgb:0.84313725490196079,0.09803921568627451,0.10980392156862745,1"/>
              <Option type="QString" name="direction" value="ccw"/>
              <Option type="QString" name="discrete" value="0"/>
              <Option type="QString" name="rampType" value="gradient"/>
              <Option type="QString" name="spec" value="rgb"/>
              <Option type="QString" name="stops" value="0.213892;37,152,214,255,hsv:0.55788888888888888,0.82600137331197065,0.83810177767605099,1;rgb;ccw:0.40543;129,211,224,255,rgb:0.50588235294117645,0.82745098039215681,0.8784313725490196,1;rgb;ccw:0.596968;199,230,219,255,rgb:0.7803921568627451,0.90196078431372551,0.85882352941176465,1;rgb;ccw:0.788506;254,201,128,255,rgb:0.99476615548943315,0.78823529411764703,0.50327306019684137,1;rgb;ccw:0.980044;240,124,74,255,rgb:0.94248874647135117,0.48758678568703745,0.29019607843137257,1;rgb;ccw"/>
            </Option>
          </colorramp>
          <item alpha="255" color="#2598d6" value="-3" label="&lt;= -3.0"/>
          <item alpha="255" color="#81d3e0" value="-1.5" label="-3.0 - -1.5"/>
          <item alpha="255" color="#c7e6db" value="0" label="-1.5 - 0.0"/>
          <item alpha="255" color="#fec980" value="1.5" label="0.0 - 1.5"/>
          <item alpha="255" color="#f07c4a" value="3" label="1.5 - 3.0"/>
          <item alpha="255" color="#d7191c" value="inf" label="> 3.0"/>
          <rampLegendSettings minimumLabel="" orientation="2" suffix="" direction="0" maximumLabel="" useContinuousLegend="1" prefix="">
            <numericFormat id="basic">
              <Option type="Map">
                <Option type="invalid" name="decimal_separator"/>
                <Option type="int" name="decimals" value="6"/>
                <Option type="int" name="rounding_type" value="0"/>
                <Option type="bool" name="show_plus" value="false"/>
                <Option type="bool" name="show_thousand_separator" value="true"/>
                <Option type="bool" name="show_trailing_zeros" value="false"/>
                <Option type="invalid" name="thousand_separator"/>
              </Option>
            </numericFormat>
          </rampLegendSettings>
        </colorrampshader>
      </rastershader>
    </rasterrenderer>
    <brightnesscontrast gamma="1" contrast="0" brightness="0"/>
    <huesaturation grayscaleMode="0" colorizeBlue="128" colorizeRed="255" colorizeOn="0" colorizeGreen="128" colorizeStrength="100" saturation="0" invertColors="0"/>
    <rasterresampler maxOversampling="2"/>
    <resamplingStage>resamplingFilter</resamplingStage>
  </pipe>
  <blendMode>0</blendMode>
</qgis>
