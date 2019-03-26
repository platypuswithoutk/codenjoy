package com.codenjoy.dojo.lemonade.model;

/*-
 * #%L
 * Codenjoy - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2018 - 2019 Codenjoy
 * %%
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public
 * License along with this program.  If not, see
 * <http://www.gnu.org/licenses/gpl-3.0.html>.
 * #L%
 */

import com.codenjoy.dojo.lemonade.client.WeatherForecast;
import org.json.JSONObject;
import org.reflections.serializers.JsonSerializer;

public class Question {
    private final int day;
    private final double lemonadePrice;
    private final double assets;
    private final WeatherForecast weatherForecast;
    private final String messages;

    public Question(int day, double lemonadePrice, double assets, WeatherForecast weatherForecast, String messages) {

        this.day = day;
        this.lemonadePrice = lemonadePrice;
        this.assets = assets;
        this.weatherForecast = weatherForecast;
        this.messages = messages;
    }

    public JSONObject toJson() {
        JSONObject questionJson = new JSONObject();
        questionJson.put("day", day);
        questionJson.put("lemonadePrice", lemonadePrice);
        questionJson.put("assets", assets);
        questionJson.put("weatherForecast", weatherForecast);
        questionJson.put("messages", messages);
        return questionJson;
    }
}
