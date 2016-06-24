Для подключения своей игры (game-name-engine) необходимо добавить зависимость
    ...
    <dependencies>
        <dependency>
            <groupId>${project.groupId}</groupId>
            <artifactId>game-name-engine</artifactId>
            <version>${project.version}</version>
        </dependency>
        ...
     </dependencies>   
А так же artifactItem ссылающийся на эту же зависимость (для извлечения ресурсов игры)
    <build>
      ...
      <plugins>
        ...
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-dependency-plugin</artifactId>
          ...
          <executions>
            <execution>
              ...
              <configuration>
                <artifactItems>
                  ...
                  <artifactItem>
                    <groupId>${project.groupId}</groupId>
                    <artifactId>game-name-engine</artifactId>
                    <version>${project.version}</version>
                    <type>jar</type>
                    <overWrite>true</overWrite>
                    <outputDirectory>${project.build.directory}/${project.build.finalName}</outputDirectory>
                    <includes>resources/**/*</includes>
                  </artifactItem>
                </artifactItems>
              </configuration>
            </execution>
          </executions>
        </plugin>
      </plugins>
    </build>
Возможно добвление сразу нескольких игрушек, а так же удаление существующих