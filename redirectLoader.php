<?php

class redirectLoader
{

    const HISTORY_FILE_PATH = './urls.json';

    protected $urls = [];

    function __construct()
    {
        $this->loadList();
        $this->saveNewValueToList(self::HISTORY_FILE_PATH);
    }

    public function getUrlList()
    {
        return json_encode($this->urls);
    }

    protected function saveNewValueToList($filepath = '')
    {
        $success = false;
        if (file_exists($filepath)) {
            if (isset($_GET["url"]) && isset($_GET["title"])) {
                $url['url'] = $_GET["url"];
                $url['title'] = $_GET["title"];
                array_unshift($this->urls, $url);
                if (sizeof($this->urls) > 20) {
                    $this->urls = array_slice($this->urls,0,20);
                }
                file_put_contents(self::HISTORY_FILE_PATH, json_encode($this->urls));
                $success = true;
            };
        } else {
            $success = false;
        }

        return $success;
    }

    public function checkUrlStatusCode($urlToParse) {
        $handle = curl_init($urlToParse);
        curl_setopt($handle,  CURLOPT_RETURNTRANSFER, true);
        curl_setopt($handle,  CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($handle);
        $httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);
        curl_close($handle);
        return json_encode(["status" => $httpCode]);
    }

    protected function loadList()
    {
        if (file_exists(self::HISTORY_FILE_PATH)) {
            $this->urls = (array)json_decode(file_get_contents(self::HISTORY_FILE_PATH));
        }
    }
}
