UUID={a2c93858-87c9-4502-8d2c-00d439678560}
SOURCES=chrome/ chrome.manifest install.rdf README.md LICENSE
ARCHIVE=${UUID}.xpi

all: ${ARCHIVE}

${ARCHIVE}:
	zip -r ${ARCHIVE} ${SOURCES}

clean:
	-rm -f ${ARCHIVE}

whoopee:
	@echo "Wheee!"
