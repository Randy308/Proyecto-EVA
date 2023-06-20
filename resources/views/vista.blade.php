<!DOCTYPE html>
<html>

<head>
    <title>Basic File In/Out</title>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script>
        function checkFileAPI() { //check if api is supported (req HTML5)
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                return true;
            } else {
                alert('The File APIs are not fully supported by your browser. Use a better browser.');
                return false;
            };
        };

        $(document).ready(function() {
            checkFileAPI();

            $("#fileInput").change(function() {
                if (this.files && this.files[0]) {
                    reader = new FileReader();
                    reader.onload = function(e) {
                        // do parsing here. e.target.result is file contents
                        $("#contents").html(e.target.result);
                    };
                    reader.readAsText(this.files[0]);
                };
            });

            $("#downloadInput").click(function() {
                var element = document.createElement('a');

                filecontents = $('#contents').html();
                // do scrubbing here
                //

                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(
                    filecontents));
                element.setAttribute('download', 'output.html');

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);
            });
        });
    </script>

</head>

<body>
    <div id="contents">
        Content here
    </div>

    <input type="file" id="fileInput" class="btn">
    <button type="button" id="downloadInput" class="btn">Download</button>
</body>

</html>
